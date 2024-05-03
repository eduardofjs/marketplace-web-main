import { BsCloudUpload } from 'react-icons/bs';
import styled from 'styled-components';

export const UploadFotosContainer = styled.div`
  margin: 15px 0;
  width: 500px;
overflow: hidden;
  border-radius: 5px;
  border: 1px dashed rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    cursor: pointer;
    color: darkblue;
    font-size: 15px;
    margin-top: 10px;
  }

`;

export const UploadIcon = styled(BsCloudUpload)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  font-size: 50px;
  margin: 10px 0;
`;

export const Label = styled.label`
    margin: 5px;
    text-align: center;
`;