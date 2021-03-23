import { IClientUser, IDebit } from '../../core/interfaces';
import { httpResponse } from '../../http-client/http-response';
import {
  DebitClientApi,
  JsonPlaceholderClientApi,
} from '../../http-client/instances';
import { IHttpResponse } from '../../http-client/interfaces';

const uuid = `?uuid=${process.env.REACT_APP_UUID}`;

export async function getUsersService(): Promise<
  IHttpResponse<IClientUser[] | null>
> {
  try {
    const { data, status } = await JsonPlaceholderClientApi.get('/users');
    return httpResponse<IClientUser[]>(true, status, data, null);
  } catch (err) {
    return httpResponse<null>(false, 404, null, err);
  }
}

export async function getDebitByIdService(
  id: string,
): Promise<IHttpResponse<IDebit | null>> {
  try {
    const { status, data } = await DebitClientApi.get(`/${id}/${uuid}`);
    return httpResponse<IDebit>(true, status, data.result, null);
  } catch (err) {
    return httpResponse<null>(false, 404, null, err);
  }
}

export async function postDebitService(
  body: IDebit,
): Promise<IHttpResponse<null>> {
  try {
    const { status } = await DebitClientApi.post(`${uuid}`, body);
    return httpResponse<null>(true, status, null, null);
  } catch (err) {
    return httpResponse<null>(false, 404, null, err);
  }
}

export async function putDebitService(
  id: string,
  body: IDebit,
): Promise<IHttpResponse<null>> {
  try {
    const { status } = await DebitClientApi.put(`/${id}/${uuid}`, body);
    return httpResponse<null>(true, status, null, null);
  } catch (err) {
    return httpResponse<null>(false, 404, null, err);
  }
}
