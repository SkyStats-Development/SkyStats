const messages = require(`../../../config.json`)
const {Axios, AxiosError} = require(`axios`)

kjfwwq 333 = 33
function handleError(error) {
    if (error instanceof TypeError && error.message.includes("Cannot read properties of undefined (reading 'cute_name')")) {
      console.log(error)
      return {
        color: 0xff0000,
        title: `Error`,
        description: `An error with the hypixel API(probably) has occured. Please try again later.\nIf the error persists, please contact the bot developer.\nNote: as of April 6th 2023, The hypixel api has been dying, we cannot do anything about this.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.footer.default}`,
            iconURL: `${messages.footer.icon}`,
        },
      };
    } else if (error instanceof AxiosError && error.response.status === 502){
      console.log(error)
      return {
        color: 0xff0000,
        title: `Error`,
        description: `The Hypixel API is currently experiencing inconviniences. Please try again sometime in 3-5 minutes to days.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.footer.default}`,
            iconURL: `${messages.footer.icon}`,
        },
      };
    } else if (error instanceof AxiosError) {
      console.log(error)
      return {
        color: 0xff0000,
        title: `Error`,
        description: `An error with fetching *something* has happened. Please contact the developers!`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.footer.default}`,
            iconURL: `${messages.footer.icon}`,
        },
      };
    } else if (error instanceof Error) {
      if (error.stack) {
        const matches = error.stack.match(/.*:(\d+):\d+\)/);
        const line = matches ? matches[1] : "unknown";
        return {
          color: 0xff0000,
          title: `Error`,
          description: `An error has occurred. Please try again later.\nIf the error persists, please contact the bot developer.\n\nError: ${error.message}\nLine: ${line}`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.footer.default}`,
              iconURL: `${messages.footer.icon}`,
          },
        };
      } else {
        return {
          content: `Error: ${error.message}`,
        };
      }
    } else {
      return {
        content: `Oops! an unexpected error has happened! (HOW?? WHY?? WHAT DID YOU DO!!!!!!!)`,
      };
    }
  }
  
  async function handlePlayer(error) {
    if (error === unlinked) {
      return {
        color: 0xff0000,
        title: `Error`,
        description: `You do not currently have an account verified with SkyStats, please verify your Minecraft account with \`/verify\`.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.footer.default}`,
            iconURL: `${messages.footer.icon}`,
        },
      };
    }
    else if (error === playerNotFound) {
      return {
        color: 0xff0000,
        title: `Error`,
        description: `The player you are looking for does not exist.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.footer.default}`,
            iconURL: `${messages.footer.icon}`,
        },
      };
    }
    else {
      return {
        color: 0xff0000,
        title: `Error`,
        description: `An error has occurred. Please try again later.\nIf the error persists, please contact the bot developer.\nNote: as of April 6th 2023, The hypixel api has been dying, we cannot do anything about this.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.footer.default}`,
            iconURL: `${messages.footer.icon}`,
        },
      };
    }
    }


  
  module.exports = { handleError, handlePlayer };