import React, {useEffect} from "react";
import api from "./api";


const App = () => {
    const [categoria, setCategoria] = React.useState("");
    const [respostaCerta, setRespostaCerta] = React.useState("");
    const [data, setData] = React.useState(null);
    const [loading, setloading] = React.useState(null);

    async function onSubmit(e) {
        e.preventDefault();
        setloading(true);
        const response = await api.get(`?categoria=${categoria}`)
        setData(response.data);
        setloading(false);
    }

    const ValidarResposta = (respostaCerta) => {
        if (respostaCerta) {
            setRespostaCerta("Acertou, parabéns!!!");
        } else {
            setRespostaCerta("Tente novamente");
        }
    }
    // function ValidarResposta(resposta) {
    //     useEffect(() => {
    //         if (resposta.respostaCerta) {
    //             setRespostaCerta("Você acertou!");
    //         }
    //         setRespostaCerta("Você errou!");
    //     }, [resposta])
    // }

    return (
        <>
            <div className='aplicativo' >

                <input
                    id="busca"
                    type="search"
                    value={categoria}
                    placeholder="Digite a categoria"
                    onChange={({target}) => setCategoria(target.value)}
                />
                <button type="submit" onClick={onSubmit} id="ok">
                    Ok
                </button>
                {loading && (
                    <p>carregando...</p>
                )}
                {!loading && data &&
                <>
                    <div className="perguntas" id="pergunta">{data.pergunta}</div>
                    <ul className="respostas" id="respostas">{data.respostas.map((resposta) =>
                        <li key={resposta.id}>
                            <button
                                id="resposta"
                                onClick={() => ValidarResposta(resposta.respostaCerta)}>
                                {resposta.descricaoResposta}
                            </button>
                        </li>
                    )}</ul>
                    <button onClick={onSubmit} id="proxima">Proxima</button>
                    <div>{respostaCerta}</div>
                </>
                }
            </div>
        </>
    );
};

export default App;