import { IClientUser, IDebit } from '../../core/interfaces';
import { httpResponse } from '../../http-client/http-response';
import {
  DebitClientApi,
  JsonPlaceholderClientApi,
} from '../../http-client/instances';
import { IHttpResponse } from '../../http-client/interfaces';

const uuid = `?uuid=${process.env.REACT_APP_UUID}`;

export async function getAllDebitsService(): Promise<
  IHttpResponse<IDebit[] | null>
> {
  try {
    const { data, status } = await DebitClientApi.get(`/${uuid}`);
    return httpResponse<IDebit[]>(true, status, data.result, null);
  } catch (err) {
    return httpResponse<null>(false, 404, null, err);
  }
}

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
