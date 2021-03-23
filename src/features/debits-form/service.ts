import { IClientUser, IDebit } from '../../core/interfaces';
import { httpResponse } from '../../http-client/http-response';
import {
  DebitClientApi,
  JsonPlaceholderClientApi,
} from '../../http-client/instances';
import { IHttpResponse } from '../../http-client/interfaces';

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

export async function postDebitService(
  body: IDebit,
): Promise<IHttpResponse<null>> {
  try {
    const { status } = await DebitClientApi.post('', body);
    return httpResponse<null>(true, status, null, null);
  } catch (err) {
    return httpResponse<null>(false, 404, null, err);
  }
}
