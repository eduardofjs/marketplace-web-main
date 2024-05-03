import axios from "axios";
import { AUTH_HEADER } from "../data";
import { getMarketplaceApiEndpoint } from "../generalFunctions";

export function UsuarioService() {
    return {
        validarEmailExistente(email) {
            return axios.post(`${getMarketplaceApiEndpoint()}/api/Usuario/GetAllUsuarioByValorExato?strValorExato=${email}&ColunaParaValorExato=USR_Email&fSomenteAtivos=true&join=false&maxInstances=1&order_by=USR_Id`, {}, AUTH_HEADER);
        }
    }
}