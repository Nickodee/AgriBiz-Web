import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerComponent } from './farmer.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('FarmerComponent', () => {
  let component: FarmerComponent;
  let fixture: ComponentFixture<FarmerComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FarmerComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.registerForm.get('firstName')?.value).toBe('');
    expect(component.registerForm.get('lastName')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('confirmPassword')?.value).toBe('');
    expect(component.registerForm.get('nationalId')?.value).toBe('');
  });

  it('should validate required fields', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['email'].setValue('john@example.com');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    component.registerForm.controls['nationalId'].setValue('12345678');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should validate password match', () => {
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password456');
    expect(component.registerForm.hasError('passwordMismatch')).toBeTruthy();
    component.registerForm.controls['confirmPassword'].setValue('password123');
    expect(component.registerForm.hasError('passwordMismatch')).toBeFalsy();
  });

  it('should call register service and navigate on successful registration', () => {
    const mockResponse = {
      success: true,
      message: 'Registration successful',
      data: { token: 'mock-token', user: { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'FARMER' } }
    };
    authServiceSpy.register.and.returnValue(of(mockResponse));

    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      nationalId: '12345678'
    });

    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      nationalId: '12345678',
      role: 'FARMER'
    });
    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/farmer-dashboard']);
  });

  it('should handle registration error', () => {
    const errorMessage = 'Registration failed';
    authServiceSpy.register.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));

    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      nationalId: '12345678'
    });

    component.onSubmit();

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.isLoading).toBeFalse();
  });
});
