/**
 * EmbedBuilder class for dynamic, array-based Discord.js embeds.
 * Handles all networth-related embed construction.
 */
import { EmbedBuilder as DjsEmbedBuilder, EmbedData } from 'discord.js';

export class EmbedBuilder {
	private base: DjsEmbedBuilder;

	constructor(baseData?: EmbedData) {
		this.base = new DjsEmbedBuilder(baseData);
	}

	addFields(fields: { name: string; value: string; inline?: boolean }[]): this {
		this.base.addFields(fields);
		return this;
	}

	addField(name: string, value: string, inline?: boolean): this {
		this.base.addFields([{ name, value, inline }]);
		return this;
	}

	setDescription(description: string): this {
		this.base.setDescription(description);
		return this;
	}

	setTitle(title: string): this {
		this.base.setTitle(title);
		return this;
	}

	setThumbnail(url: string): this {
		this.base.setThumbnail(url);
		return this;
	}

	setFooter(text: string, iconURL?: string): this {
		this.base.setFooter({ text, iconURL });
		return this;
	}

	setColor(color: number): this {
		this.base.setColor(color);
		return this;
	}

	setURL(url: string): this {
		this.base.setURL(url);
		return this;
	}

	build(): DjsEmbedBuilder {
		return this.base;
	}
}
