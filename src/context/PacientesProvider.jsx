import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {
     const [pacientes, setPacientes] = useState([]);
     const [paciente, setPaciente] = useState({});

     useEffect(() => {
          const obtenerPacientes = async () => {
               try {
                    const token = localStorage.getItem('token');
                    if(!token) return;
                    const config = {
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`
                         }
                    }

                    const {data} = await clienteAxios('/pacientes', config);
                    setPacientes(data);                    
               } catch (error) {
                    console.log(error);
               }
          }
          obtenerPacientes();
     }, []);

     const guardarPaciente = async (paciente) => {
          const token = localStorage.getItem('token');
          const config = {
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               }
          }
          if(paciente.id){
               try {
                    const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                    const pacientesActualizados = pacientes.map(paciente => paciente._id === data._id ? data : paciente);
                    setPacientes(pacientesActualizados);
               } catch (error) {
                    console.log(error);
               }
          }else{
               try {
                    
                    const {data} = await clienteAxios.post('/pacientes', paciente, config);
                    const {updatedAt, createdAt, __v, ...pacienteAlmacenado} = data; 
                    setPacientes([pacienteAlmacenado, ...pacientes])
               } catch (error) {
                    console.log(error.response.data.msg);
               }
          }          
     };

     const setEdicion = async paciente => {
          setPaciente(paciente);
     };

     const eliminarPaciente = async id => {
          const confirmar = confirm('¿Deseas eliminar el registro?')
          if(confirmar){
               try {
                    const token = localStorage.getItem('token');
                    const config = {
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`
                         }
                    }
                    await clienteAxios.delete(`/pacientes/${id}`, config);
                    const pacientesActualizados = pacientes.filter(paciente => paciente._id !== id);
                    setPacientes(pacientesActualizados);
               } catch (error) {
                    console.log(error);
               }
          }
          return;
     }

     return (
          <PacientesContext.Provider
               value={{
                    pacientes,
                    guardarPaciente,
                    setEdicion,
                    paciente,
                    eliminarPaciente
               }}
          >
               {children}
          </PacientesContext.Provider>

     )
}

export default PacientesContext;