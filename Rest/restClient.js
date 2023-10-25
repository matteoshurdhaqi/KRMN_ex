export default class RestClient {

    constructor(baseURl) {
        this.baseURL = baseURl;
    }

    // get(endpoint){
    //     return fetch(`${this.baseURL}/${endpoint}`)
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error(`Errore: ${response.status}. Elemento non trovato.`)
    //         }
    //         return response.json();
    //     })
    // }

    // post(endpoint, data){
    //     const headers = {
    //         method: 'POST',
    //         headers: new Headers({
    //             "Content-Type": "application/json"
    //         }),
    //         body: JSON.stringify(data)
    //     }
    //     return fetch(`${this.baseURL}/${endpoint}`, headers)
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error(`Errore: ${response.status}. Riprova :(`) 
    //         }
    //         return response.json()
    //     })
    // }

    // put(endpoint, data){
    //     const headers = {
    //         method: 'PUT',
    //         headers: new Headers({
    //             "Content-Type": "application/json"
    //         }),
    //         body: JSON.stringify(data)
    //     }

    //     return fetch(`${this.baseURL}/${endpoint}`, headers)
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error(`Errore: ${response.status}. Riprova :(`) 
    //         }
    //         return response.json()
    //     })

    // }

    // delete(endpoint){
    //     return fetch(`${this.baseURL}/${endpoint}`, {method: 'DELETE'})
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error(`Errore: ${response.status}. Riprova :(`) 
    //         }
    //         return response.json()
    //     })
    // }


    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`)
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}. Riprova :(`)
            }
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    async post(endpoint, data) {

        const options = {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`, options)
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}. Riprova :(`)
            }
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async put(endpoint, data) {

        const options = {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`, options)
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}. Riprova :(`)
            }
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async delete(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`, { method: 'DELETE' })
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}. Riprova :(`)
            }
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }
}



