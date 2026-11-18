


function ImagemTopo({ imagem, titulo, subtitulo }) {

    return (
        <div className="image-topo d-flex flex-column justify-content-end" style={{ '--image-topo': `url(${imagem})` }}>
            <div className="container">
                <h1 className="fs-1 fw-semibold">{titulo}</h1>
                <p className="fs-6">{subtitulo}</p>
            </div>
        </div>
    )

}

export default ImagemTopo;