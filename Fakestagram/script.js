

// axios.get('http://dms.cyberdelia.eu/api/v1/user', {
//     params:{
//         firstname: 'Eric',
//         lastname: 'Cartman'
//     }
// })
// .then(function (response) {
//    console.log(response.data[0]);
   
// }).catch(function (e) {
//     console.error(e);
// })


const baseUrl = 'http://dms.cyberdelia.eu/api/v1/user';

const getUser = async()=>{
    try{
        const response = await axios.get('http://dms.cyberdelia.eu/api/v1/user');
        console.log(response);
    }catch(e){
        console.log(e);
    }
}
