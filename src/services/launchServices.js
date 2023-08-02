import axios from 'axios'

export const launchServices = {
    getLaunches,
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
    }
}