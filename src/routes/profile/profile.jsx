import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { createPortal } from "react-dom";
import { Select } from '@mantine/core';
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import Logo from "../../components/Logo/Logo";
import styles from "./profile.module.scss";

function Profile() {
  const [stores, setStores] = useState([]);
  const [createToggle, setCreateToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeStage, setStoreStage] = useState("");
  const [currentStoreId, setCurrentStoreId] = useState(null);
  const [error, setError] = useState(false);
  
  async function onSubmitCreateForm(e) {
    e.preventDefault();
    
    const user = window.localStorage.getItem("user");
    let res;
    if (createToggle) {
      res = await axios.post("http://localhost:4000/stores", {name: storeName, stage: storeStage}, {headers: {"Authorization": user}});
    } else {
      res = await axios.put(`http://localhost:4000/stores/${currentStoreId}`, {name: storeName, stage: storeStage}, {headers: {"Authorization": user}});
    }

    if (res.status === 200) {
      setCreateToggle(false);
      setEditToggle(false);
      setStoreName("");
      setStoreStage("");
      fetchStores();
    } else {
      setError(true);
    }
  }

  async function fetchStores() {
    const user = window.localStorage.getItem("user");
    axios.get("http://localhost:4000/stores", {headers: {"Authorization": user}}).then(({data}) => setStores(data));
  }

  async function onClickActionsButton(text, store) {
    const user = window.localStorage.getItem("user");
    if (text === "Edit") {
      setEditToggle(true);
      setCurrentStoreId(store.id);
      setStoreName(store.name);
      setStoreStage(store.stage);
    } else {
      const res = await axios.delete(`http://localhost:4000/stores/${store.id}`, {headers: {"Authorization": user}});
      if (res.status === 200) {
        fetchStores();
      }
    }
  }

  function closeForms() {
    setCreateToggle(false);
    setEditToggle(false);
  }
  
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    axios.get("http://localhost:4000/stores", {headers: {"Authorization": user}}).then(({data}) => setStores(data));
  }, []);

  return (
    <div className={styles.profile}>
        <div className={styles.header}>
          <Logo />
        </div>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link to="">Stores</Link>
          </li>
          <li>
            <Link to="">Team</Link>
          </li>
          <li>
            <Link to="">Settings</Link>
          </li>
        </ul>
      </div>
      <div className={styles.stores}>
        <div className={styles.storesContainer}>
          <div className={styles.storesHeader}>
            <h1>Stores</h1>
            <button onClick={() => setCreateToggle(true)}>Add Store</button>
          </div>
          <div className={`${styles.storesList} ${stores.length < 1 && styles.storesListNone}`}>
            {stores.length < 1 && "No stores created"}
            {stores.length >= 1 && stores.map((store) => (
              <div key={store.id}>
                <h3>{store.name}</h3>
                <span>{store.stage}</span>
                <div>
                  <ButtonMenu content="Actions" onClickActionsButton={(text) => onClickActionsButton.call(null, text, {id: store.id, name: store.name, stage: store.stage})} dropdownContent={[{text: "Edit"}, {text: "Delete"}]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {(createToggle || editToggle) && createPortal(<div onClick={closeForms} className={styles.overlay}></div>, document.body)}
      {(createToggle || editToggle) && createPortal(
          <div className={styles.createForm}>
            <h2>{editToggle ? "Edit" : "Create"} Store</h2>
            {error && <p>Something went wrong</p>}
            <form onSubmit={onSubmitCreateForm}>
              <div>
                <label>Name</label>
                <input value={storeName} onChange={(e) => setStoreName(e.target.value)} type="text" />
              </div>
              <div>
                <label>Stage</label>
                <Select
                  style={{ marginTop: 20, zIndex: 2 }}
                  data={["Development", "Production"]}
                  placeholder="Pick one"
                  value={storeStage}
                  onChange={setStoreStage}
                />
              </div>
              <div>
                <button type="submit">{editToggle ? "Edit" : "Create"}</button>
              </div>
            </form>
          </div>,
        document.body
      )}, 
    </div>
  )
}

export default Profile;