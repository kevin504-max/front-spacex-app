import axios from 'axios'

export const launchServices = {
    getLaunches,
    getRocket,
}

async function getLaunches() {
    try {
        const response = await axios.get('launches');
        
        response.data.launches.sort((a, b) => {
            return a.flight_number - b.flight_number;
        });

        return await response.data.launches;
    } catch (error) {
        console.log("Erro ao buscar lançamentos: ", error);
        return null;
    }
}

async function getRocket(rocketId) {
    try {
        const response = await axios.get(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
        const rocket = response.data;

        return await rocket.name;
    } catch (error) {
        console.log("Erro ao buscar foguete: ", error)
        return null;
    }
} 