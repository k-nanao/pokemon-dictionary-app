import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  //非同期処理で読み込んでいるときのローディングを格納する。最初のtrueはuseEffectで初期読み込みでも再現させるため
  const [loading, setLoading] = useState(true);
  //_pokemonDataを格納する
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの書斎なデータを取得、中にアクセスしてfetchで再び取得する
      loadPokemon(res.results);

      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //loadPokemonの引数をdataで受け取る
  const loadPokemon = async (data) => {
    //Promise.allは今回のfetchで呼び出すデータは20個あった。その20個全て呼び出すまでallにはその意味がある。map関数で展開できたのはPromise.allで呼び出しものは配列になる
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <>
      <Navbar />
      <div className='App'>
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
