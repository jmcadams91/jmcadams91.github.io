import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TripCardComponent } from './trip-card.component';
import { Trip } from '../models/trip';

describe('TripCardComponent', () => {
  let component: TripCardComponent;
  let fixture: ComponentFixture<TripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCardComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCardComponent);
    component = fixture.componentInstance;
    // provide a mock Trip input so template bindings don't fail
    const mockTrip: Trip = {
      _id: '1',
      code: 'T1',
      name: 'Test Trip',
      length: '5 days',
      start: new Date(),
      resort: 'Test Resort',
      perPerson: '100',
      image: '',
      description: ''
    };
    component.trip = mockTrip;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
