import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  document.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
      const btn = document.querySelector('#send');
      btn.click();
    }
  });
  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum cep!')
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('');
    } catch {
      alert('Ops erro ao buscar')
      setInput("")
    }
  }

  return (

    <div div className="container" >
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" id="send" className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" /></button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && (
            <span>Complemento:{cep.complemento}</span>
          )}
          <span>{cep.bairro}</span>
          <span>{cep.localidade}{" "}{cep.uf}</span>
        </main>
      )}


    </div>
  );
}

export default App;
/*idea: pegar uma api que mostre pesquisando pela rua, e usar o resultado dessa pesquisa
para buscar o cep, usando o cep que a api que pesquisa pela rua retornar. */ 