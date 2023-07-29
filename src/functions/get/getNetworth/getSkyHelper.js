const axios = require('axios');
const { getNetworth } = require('skyhelper-networth');
require("dotenv").config();
const apiKey = process.env.KEY



async function fetchMuseumData(profile, uuid) {
    const url = `https://api.hypixel.net/skyblock/museum?key=${apiKey}&profile=${profile}`;
    try {
      const response = await axios.get(url);
      const museumData = response.data.members[uuid];
    
      // Check if the museum data for the specified UUID is present.
      if (!museumData || !museumData.value) {
        console.error('Museum data not found for the specified UUID:', response.data);
        return null;
      }
    
      return museumData;
    } catch (error) {
      console.error('Error fetching museum data:', error);
      return null;
    }
  }

  async function fetchProfileData(uuid) {
    const url = `https://api.hypixel.net/skyblock/profiles?key=${apiKey}&uuid=${uuid}`;
    try {
      const response = await axios.get(url);
      const profiles = response.data.profiles;
  
      // Find the profile that matches the UUID and has 'selected: true'.
      const selectedProfile = profiles.find(profile => profile.selected && profile.members[uuid]);
  
      // If no matching profile is found, return null or handle the error as needed.
      if (!selectedProfile) {
        console.error('Selected profile data not found or does not contain members:', response.data);
        return null;
      }
  
      // Access 'banking' property, if available, or set it to null otherwise.
      const bankBalance = selectedProfile.banking?.balance || null;
  
      // Return an object containing both 'members[uuid]' and 'bankBalance'.
      return {
        memberData: selectedProfile.members[uuid],
        bankBalance: bankBalance
      };
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  }
  
  async function getSkyHelper(profile, uuid) {
    const { memberData, bankBalance } = await fetchProfileData(uuid);
    const museumData = await fetchMuseumData(profile, uuid);
  
    const networth = await getNetworth(memberData, bankBalance, { museumData });

    return { networth };
  }

module.exports = { getSkyHelper }
