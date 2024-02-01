import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LogoutException from 'App/Exceptions/LogoutException';
import LoginService from 'App/Services/v1/LoginService';
import LoginValidator from 'App/Validators/v1/LoginValidator';
import utils from 'Utils/utils';

export default class LoginController {
  public loginService = new LoginService();

  public async login(context: HttpContextContract) {
    const payload = await context.request.validate(LoginValidator);

    const auth = await this.loginService.login(payload);

    const data = {
      name: auth.name,
      email: auth.email,
      is_active: auth.is_active,
    };

    const expiresIn = payload.rememberMe ? 604800000 : 86400000;

    const token = await context.auth.use('api').generate(auth, { expiresIn });

    const body = utils.getBody('LOGIN_SUCCESS', {
      ...token.toJSON(),
      payload: { id: auth.id, ...data },
    });

    context.response.status(200).send(body);
  }

  public async logout(context: HttpContextContract) {
    if (!context.request.header('Authorization')) {
      throw new LogoutException('LOGOUT_ERROR', 400);
    }

    await context.auth.use('api').revoke();

    const headers = utils.getHeaders();

    const body = utils.getBody('LOGOUT_SUCCESS', { revoked: true });

    context.response.status(200).send({ body, headers });
  }
}
