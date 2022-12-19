import React from "react";
import { useRef } from "react";
import axios from "axios";

export default function (props) {

    const {types} = props
    const nameRef = useRef()
    const cityRef = useRef()
    const priceRef= useRef()
    const typeRef = useRef()

    async function formSubmitHandler(e){
        e.preventDefault()

        const name = nameRef.current.value;
        const city = cityRef.current.value;
        const price = priceRef.current.value;
        const type = typeRef.current.value;

        const newApartment = {
            name,
            city,
            price,
            type
        }

        axios.post('/api/apartment/create', newApartment)
        


    }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome Appartamento
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            ref={nameRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            Città
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            ref={cityRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Prezzo per notte
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            ref={priceRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Tipo Appartamento
          </label>
          
          <select name="type" id="type" ref={typeRef}>
            {types.map((type) => (<option key={type.id}>{type.name}</option>))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}


