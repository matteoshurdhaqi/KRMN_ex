
const baseUserUrl = 'http://dms.cyberdelia.eu/api/v1/user';
const basePostsUrl = 'http://dms.cyberdelia.eu/api/v1/post';

const userImg = document.querySelector('.user_img');
const userName = document.querySelectorAll('.user_name');
const cardImg = document.querySelector('.card_img');
const cardDescription = document.querySelector('.card_desc');


axios.get(baseUserUrl)
.then((res)=>{userHandler((res.data))})
.catch((e)=>{
    console.log(e);
});

axios.get(basePostsUrl)
.then((res)=>{imgHandler(res.data)})
.catch((e)=>{
    console.log(e);
})



function userHandler(data){
    
    const user = {...data[0]}
    
    let markup = `<img src=${user.imgSrc} alt="${user.firstname}-${user.lastname}">`;
    userImg.insertAdjacentHTML('beforeend', markup);
    // userName.insertAdjacentHTML('afterbegin', `<strong>${user.firstname} ${user.lastname}</strong>`)
    userName.forEach(element => {
        element.insertAdjacentHTML('afterbegin', `<strong>${user.firstname} ${user.lastname}</strong>`)
    });
}
function imgHandler(data) {
    const post = {...data[0]};
    let markup = `<img src=${post.imgSrc} alt="${post.description}">`;
    cardImg.insertAdjacentHTML('beforeend', markup);
    cardDescription.insertAdjacentText('afterend', ` ${post.description}`);
}
