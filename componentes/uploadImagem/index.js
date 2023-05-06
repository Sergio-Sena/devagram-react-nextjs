import { useRef } from "react";

export default function uploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName = ''
}) {
    const referenciaInput = useRef('')



    const gestorDeArquivos = () => {
        referenciaInput?.current?.click();
        console.log(gestorDeArquivos)
    }

    const aoAlterarImagem = () => {
        console.log('aoAlterarImagem')
        if (!referenciaInput?.current?.file?.length) {
            return;
        }
        const arquivo = referenciaInput?.current?.file[0];
        const fileReader = new fileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            setImagem({
                preview: fileReader.result,
                arquivo
            });
        }
    };

    return (
        <div className={`uploadImagemContainer ${className}`} onClick={gestorDeArquivos}>
            <button>Abrir arquivos</button>
            {imagemPreview && (
                <div className="imagemPreviewContainer">
                    <img
                        src={imagemPreview}
                        alt='imagemPreview'
                        className={imagemPreviewClassName}
                    />
                </div>


            )
            }

            <input
                type="file"
                className="oculto "
                accept="image/*"
                ref={referenciaInput}
                onChange={aoAlterarImagem}
            />
        </div >
    );
}