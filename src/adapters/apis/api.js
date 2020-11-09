const BASE_URL = 'http://localhost:3001';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, token = "", options = {}) {
    await simulateNetworkLatency();
  
    options.headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
  
    const url =  endpoint;
    const response = await fetch(url, options);
    const data = await response.json();
  
    return data;
  }
  
  const api = {
    users: {      
      list(token) {
        return callApi("http://localhost:8000/api/user/list/", token);
      },
    },
    messages: {
      list(token) {
        return callApi("http://localhost:8000/api/message/list/", token);
      },
      create(message, token) {
        // throw new Error('500: Server error');
        return callApi(`http://localhost:8000/api/message/create/`, token, {
          method: "POST",
          body: JSON.stringify(message),
        });
      },
      // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
      remove(messageId, token) {
        return callApi(`http://localhost:8000/api/message/delete/${messageId}`, token,{
          method: "DELETE",
        });
      },
    }
  };

  export default api;