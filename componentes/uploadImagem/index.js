import { useEffect, useRef } from "react";

export default function uploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName = '',
    aoSertarReferencia
}) {
    const referenciaInput = useRef(null)
    useEffect(() => {
        if (!aoSertarReferencia) {
            return;
        }
        aoSertarReferencia(referenciaInput?.current);

    }, [referenciaInput?.current]);


    const gestorDeArquivos = () => {
        referenciaInput?.current?.click();
        console.log(gestorDeArquivos)
    }

    const aoAlterarImagem = () => {

        if (!referenciaInput?.current?.files?.length) {
            return;
        }
        const arquivo = referenciaInput?.current?.files[0];
        const fileReader = new FileReader();
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