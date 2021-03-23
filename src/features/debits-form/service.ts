import { IClientUser } from '../../core/interfaces';
import { httpResponse } from '../../http-client/http-response';
import { JsonPlaceholderClientApi } from '../../http-client/instances';
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
