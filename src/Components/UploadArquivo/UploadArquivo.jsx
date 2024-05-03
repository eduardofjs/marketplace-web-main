import React, { useContext } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import {
  Label,
  UploadFotosContainer,
  UploadIcon,
} from "./UploadArquivo.styles";
import axios from "axios";
import { AUTH_HEADER, UPLOAD_HEADER } from "../../data";
import { toast } from "react-toastify";
import { OfertaCtx } from "../../Pages/Dashboard/Oferta/Oferta";
import { AiFillFilePdf } from "react-icons/ai";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const UploadArquivo = ({
  editarUploadEmpresaId,
  editarUploadUsuarioInsercaoId,
  editarUploadOfertaDispatch,
}) => {
  const { ofertaFormState, ofertaDispatch } = useContext(OfertaCtx);

  const { globalCtx } = useContext(GlobalDataCtx);

  ////
  const uploadImagem = async (nomeArquivo, idEmpresa, idUsuario, arquivo) => {
    let formData = new FormData();

    formData.append("arquivo", arquivo);

    const docString = "Documentos\\\\";

    const uploadImgEndpoint = `${getMarketplaceApiEndpoint()}/api/Base/EnviarImagem?nome_arquivo=${nomeArquivo}&nome_pasta=${docString}${idEmpresa}`;

    try {
      let enviarImgRes = await axios.post(
        uploadImgEndpoint,
        formData,
        UPLOAD_HEADER
      );

      if (enviarImgRes.status >= 200 && enviarImgRes.status <= 299) {
        //o retorno é o que precisa ser salvo dentro do Obj Documento
        toast.success(`Imagem "${nomeArquivo}" enviada com sucesso`);
        const objDocumento = {
          DOC_Id: 0,
          DOC_TipoDocumentoId: 1,
          DOC_UsuarioId: idUsuario,
          DOC_Nome: nomeArquivo,
          DOC_PathUrl: enviarImgRes.data.path,
          DOC_Ativo: true,
        };

        try {
          let enviarDocRes = await axios.put(
            `${getMarketplaceApiEndpoint()}/api/Documento/CadastroDocumento`,
            objDocumento,
            AUTH_HEADER
          );

          if (enviarDocRes.status >= 200 && enviarImgRes.status <= 299) {
            if (editarUploadOfertaDispatch) {
              editarUploadOfertaDispatch({
                type: "UploadImagem",
                value: {
                  OXD_Id: 0,
                  OXD_OfertaId: 0,
                  OXD_DocumentoId: enviarDocRes.data.DOC_Id,
                  OXD_FlagAtivo: true,
                },
              });
            } else {
              ofertaDispatch({
                type: "UploadImagem",
                value: {
                  OXD_Id: 0,
                  OXD_OfertaId: 0,
                  OXD_DocumentoId: enviarDocRes.data.DOC_Id,
                  OXD_FlagAtivo: true,
                },
              });
            }
          }
        } catch (err) {
          toast.error(
            `Ocorreu um erro no upload do documento. (${err.message})`
          );
        }
      }
    } catch (err) {
      toast.error(`Ocorreu um erro no upload da imagem. (${err.message})`);
    }
  };
  ///

  const fileParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const onFileChange = ({ meta, file }, status) => {};
  const onSubmit = (files, allFiles) => {
    allFiles.forEach((f) =>
      uploadImagem(
        f.file.name,
        editarUploadEmpresaId
          ? editarUploadEmpresaId
          : ofertaFormState.OFE_EmpresaId,
        editarUploadUsuarioInsercaoId
          ? editarUploadUsuarioInsercaoId
          : ofertaFormState.OFE_UsuarioInsercaoId,
        f.file
      )
    );
    allFiles.forEach((f) => f.remove());
  };
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg =
      files.length > 0
        ? globalCtx.idioma
          ? "+ Adicionar outros arquivos"
          : "+ Add more files"
        : globalCtx.idioma
        ? "Clique aqui ou arraste arquivos para fazer o upload"
        : "Click here to select or drag files to upload";
    return (
      <Label>
        {textMsg}
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </Label>
    );
  };
  return (
    <UploadFotosContainer>
      <UploadIcon />
      <Dropzone
        onSubmit={onSubmit}
        onChangeStatus={onFileChange}
        InputComponent={selectFileInput}
        getUploadParams={fileParams}
        getFilesFromEvent={getFilesFromEvent}
        submitButtonContent={
          globalCtx.idioma ? "Confirmar Upload" : "Confirm Upload"
        }
        accept="image/*,audio/*,video/*"
        maxFiles={5}
        inputContent="Drop A File"
        styles={{
          dropzone: {
            border: "none",
            overflow: "hidden",
            alignItems: "center",
          },
          submitButton: {
            backgroundColor: "#115934",
            padding: "10px 15px",
            borderRadius: "10px",
            fontSize: "15px",
          },
          previewImage: { objectFit: "cover", height: "200px" },
          dropzoneActive: { borderColor: "green" },
          input: { backgroundColor: "green" },
        }}
      ></Dropzone>
    </UploadFotosContainer>
  );
};
export default UploadArquivo;
