const config = require(`../../../config.json`)
const messages = config.messages.discord
const {Axios, AxiosError} = require(`axios`)

function handleError(error) {

  if (error instanceof TypeError || error instanceof TypeError) {
    switch (error) {
      case error.message.includes("Cannot read properties of undefined (reading 'cute_name')"):
        return {
          color: 0xff0000,
          title: `Error`,
          description: `An occurred while fetching your SkyBlock profile stats\nCheck your imputted username and try again.`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
      case error.response.data.code === "minecraft.invalid_username":
        return {
          color: 0xff0000,
          title: error.response.data.message || "Error",
          description: `The username you have entered does not currently own minecraft java edition`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
      case error.response.data.code === "api.unknown_error":
        return {
          color: 0xff0000,
          title: error.response.data.message || "Error",
          description: `An error with searching your username has happened, please double check and try again!`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
      case error.response.data.cause === "This endpoint is currently disabled":
        return {
          color: 0xff0000,
          title: "An error has occurred while trying to reach the Hypixel API",
          description: `The endpoint(s) that SkyStats uses to communicate with the hypixel api are currently down\nThis has automatically been reported to developers.`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
      case error.response.data.code === "minecraft.api_failure":
        return {
          color: 0xff0000,
          title: error.response.data.message || "Error",
          description: `The mojang API has returned an invalid response.`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
        
      case error.response.status === 502:
        return {
          color: 0xff0000,
          title: `Error`,
          description: `\`error response 502\` An error has occurred and your request cannot be completed.  Try again later`,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
      default:
        console.log(error)
        return {
          color: 0xff0000,
          title: `Error`,
          description: `An error with fetching *something* has happened. Please contact the developers! with the below data!\n\n\`\`\`${error?.response?.data}\`\`\``,
          timestamp: new Date().toISOString(),
          footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
          },
        };
    };
  }
  if (error instanceof AxiosError) {

  }
  if (error instanceof Error) {
    const matches = error.stack.match(/.*:(\d+):\d+\)/);
    const line = matches ? matches[1] : "unknown";
    return {
      color: 0xff0000,
      title: `Error`,
      description: `An error has occurred. Please try again later.\nIf the error persists, please contact the bot developer.\n\nError: ${error.message}\nLine: ${line}`,
      timestamp: new Date().toISOString(),
      footer: {
          text: `${messages.default}`,
          iconURL: `${messages.icon}`,
      },
    };
  }

}

  async function handlePlayer(error) {
    if (error === "unlinked") {
      return {
        color: 0xff0000,
        title: `Error`,
        description: `You do not currently have an account verified with SkyStats, please link your discord account with \`/verify\`.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.default}`,
            iconURL: `${messages.icon}`,
        },
      };
    }
    else if (error === "playerNotFound") {
      return {
        color: 0xff0000,
        title: `Error`,
        description: `The player you are looking for does not exist.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.default}`,
            iconURL: `${messages.icon}`,
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
            text: `${messages.default}`,
            iconURL: `${messages.icon}`,
        },
      };
    }
    }


  
  module.exports = { handleError, handlePlayer };