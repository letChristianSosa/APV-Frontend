import {useState} from 'react';
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {
     const [nombre, setNombre] = useState('');
     const [propietario, setPropietario] = useState('');
     const [email, setEmail] = useState('');
     const [fecha, setFecha] = useState('');
     const [sintomas, setSintomas] = useState('');

     const [alerta, setAlerta] = useState({});

     const {guardarPaciente} = usePacientes();

     const handleSubmit = e => {
          e.preventDefault();
          if([nombre, propietario, email, fecha, sintomas].includes('')){
               setAlerta({error: true, msg: 'Todos los campos son obligatorios'});
               return;
          }

          setAlerta({});
          guardarPaciente({nombre, propietario, email, fecha, sintomas})
     }

  return (
     <>
          <p className="text-lg text-center mb-10">Anade tus pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>

          <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>
               <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input id= "nombre" type="text" placeholder="Nombre de la Mascota" value={nombre} onChange={e => setNombre(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
               </div>

               <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input id= "propietario" type="text" placeholder="Nombre del Propietario" value={propietario} onChange={e => setPropietario(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
               </div>

               <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
                    <input id= "email" type="email" placeholder="Email del Propietario" value={email} onChange={e => setEmail(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
               </div>

               <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                    <input id= "fecha" type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
               </div>

               <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea id= "sintomas" placeholder="Describe los Sintomas" value={sintomas} onChange={e => setSintomas(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
               </div>

               <input type="submit" value="Agregar Paciente" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"/>
          </form>
          {alerta.msg && <Alerta alerta = {alerta}/>}
     </>
  )
}

export default Formulario