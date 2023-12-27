const axios = require('axios');
const { getNetworth } = require('skyhelper-networth');
require("dotenv").config();
const apiKey = process.env.KEY;

const fetchMuseumData = async (profile, uuid) => {
 const url = `https://api.hypixel.net/v2/skyblock/museum?key=${apiKey}&profile=${profile}`;
 try {
    const response = await axios.get(url);
    const museumData = response.data.members[uuid];

    if (!museumData || !museumData.value) {
      return null;
    }

    return museumData;
 } catch (error) {
    return null;
 }
};

const fetchProfileData = async (uuid) => {
 const url = `https://api.hypixel.net/v2/skyblock/profiles?key=${apiKey}&uuid=${uuid}`;
 try {
    const response = await axios.get(url);
    const profiles = response.data.profiles;

    const selectedProfile = profiles.find(profile => profile.selected && profile.members[uuid]);

    if (!selectedProfile) {
      console.error('Selected profile data not found or does not contain members:', response.data);
      return null;
    }

    const bankBalance = selectedProfile.banking?.balance || null;

    return {
      memberData: selectedProfile.members[uuid],
      bankBalance: bankBalance
    };
 } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
 }
};

const getSkyHelper = async (profile, uuid) => {
 const { memberData, bankBalance } = await fetchProfileData(uuid);
 const museumData = await fetchMuseumData(profile, uuid);

 const networth = await getNetworth(memberData, bankBalance, {v2Endpoint: true, museumData });

 return { networth };
};

module.exports = { getSkyHelper };