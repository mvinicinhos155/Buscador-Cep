import { AiOutlineSearch } from "react-icons/ai";
import './style.css'
import './App.css';
import { useState } from "react";
import api from "./services/api";

function App() {
//aqui se inicia o usu do "useState" com dois parametro//
const [cep, usecep] = useState('')
const [obj, setobj] = useState({})


//função asicrona que ver se tem algo digitado dentro do input//
async function vericep () {
  if (cep === ""){
    alert("Digite seu cep")
    return;
  }
//função asicrona que faz espera o resultado da api, caso ache ele me retorna try
  try {
    const response = await api.get(`${cep}/json`)
    setobj(response.data)
    usecep("")
    //caso a api não retorne "catch"
  }catch {
    alert("erro ao digitar o cep")
    usecep("")
  }
 
}


  return (
    
    <div className="container">
      <h2>Buscador CEP</h2>
      <div className="inputs">
        <input type='text' value={cep} placeholder='Digite seu CEP' onChange={(e) => usecep(e.target.value)}/>
        <button onClick={vericep} ><AiOutlineSearch/></button>
      </div>
    {/*to verificando se tem alguma coisa dentro de cep, se tiver vai aparecer na tela o <mein/> */}
      {Object.keys(obj).length > 0 && (
          <main className="main">
          <h1>Cep: {obj.cep}</h1>
  
          <span>{obj.logradouro}</span>
          <span>Complemento:{obj.complemento}</span>
          <span>{obj.bairro}</span>
          <span>{obj.localidade} - {obj.uf}</span>
        </main>
      )
      
      }
      
    </div>
  );
}

export default App;
