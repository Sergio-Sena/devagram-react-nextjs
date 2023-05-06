import avatarVazio from '../../public/imagens/avatar.svg';

export default function avatar({ src }) {
    const getAvatar = ()=>{
        if(src && src !=='undefined'){
            return src;
        }
        return avatarVazio.src;
    }

    return (
        <
            img
            src={getAvatar()}
            alt='Avatar'
            className='avatar'
        />
    );
}





