import axios from 'axios'

export const launchServices = {
    getLaunches,
}

async function getLaunches() {
    try {
        const response = await axios.get('launches');

        return await response.data.launches;
    } catch (error) {
        console.log("Erro ao buscar lançamentos: ", error);
    }
}