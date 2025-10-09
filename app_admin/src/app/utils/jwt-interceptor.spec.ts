import { JwtInterceptor } from './jwt-interceptor';
import { AuthenticationService } from '../services/authentication.service';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    // create a minimal mock AuthenticationService
    const mockAuth: Partial<AuthenticationService> = {
      isLoggedIn: () => false,
      getToken: () => ''
    };
    interceptor = new JwtInterceptor(mockAuth as AuthenticationService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
