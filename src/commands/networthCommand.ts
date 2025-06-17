import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	ComponentType,
	StringSelectMenuInteraction,
} from 'discord.js';
import { getNetworth } from '../services/getNetworth';
import { getPlayer } from '../services/getPlayer';
import { handleError } from '../services/handleError';
import { buildNetworthEmbed } from '../embeds/networthEmbed';

/**
 * /networth slash command - fetches and displays a user's Skyblock networth breakdown
 */
export const data = new SlashCommandBuilder()
	.setName('networth')
	.setDescription('Fetches your networth!')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	try {
		const id = interaction.user.id;
		const name = interaction.options.getString('name') || undefined;
		const { uuid2, username, profilename, profileid, profile, bankBalance, museum, error } = await getPlayer(
			id,
			name,
			{ INCLUDE_MUSEUM: true },
		);
		if (error) {
			await interaction.editReply({ embeds: [error] });
			return;
		}

		// You may need to fetch cookie price from a utility or cache, here assumed as 0 for placeholder
		const cookiePrice = 0;
		const networth = await getNetworth(uuid2, profileid, profile, bankBalance, museum, cookiePrice);
		const embedSections = [
			{ key: 'totals_embed', label: 'Totals' },
			{ key: 'wardrobe_embed', label: 'Wardrobe' },
			{ key: 'inventory_embed', label: 'Inventory' },
			{ key: 'enderchest_embed', label: 'Enderchest' },
			{ key: 'storage_embed', label: 'Storage' },
			{ key: 'pet_embed', label: 'Pets' },
			{ key: 'talisman_bag_embed', label: 'Accessory Bag' },
			{ key: 'museum_embed', label: 'Museum' },
		];

		const embeds = await Promise.all(
			embedSections.map((section) =>
				buildNetworthEmbed(section.key, uuid2, profileid, username, profilename, networth),
			),
		);

		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId('selectmenu')
			.setPlaceholder('Select a field...')
			.addOptions(
				embedSections.slice(1).map((section) => ({
					label: section.label,
					value: section.key,
				})),
			);
		const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

		await interaction.editReply({ embeds: [embeds[0]], components: [row] });

		const collector = interaction.channel?.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			time: 60000,
		});
		collector?.on('collect', async (i) => {
			const selectInteraction = i as StringSelectMenuInteraction;
			if (selectInteraction.user.id !== interaction.user.id) {
				await selectInteraction.reply({
					content: "You can't use this select menu.",
					ephemeral: true,
				});
				return;
			}
			const selected = embedSections.findIndex((s) => s.key === selectInteraction.values[0]);
			if (selected > 0) {
				await selectInteraction.update({
					embeds: [embeds[selected]],
					components: [row],
				});
			}
		});
		collector?.on('end', async () => {
			try {
				await interaction.editReply({ components: [] });
			} catch {}
		});
	} catch (err) {
		const errorEmbed = handleError(err);
		await interaction.editReply({ embeds: [errorEmbed] });
	}
}

export default { data, execute };
