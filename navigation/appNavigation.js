import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {useDispatch, useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';
import {setUser} from '../redux/slices/user';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, user => {
    //React Native Tutorial #8 - Firebase Auth & Firestore 2:30
    console.log('Got user', {user});
    dispatch(setUser(user));
  });

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen component={HomeScreen} options={{headerShown: false}} name="Home"  />
          <Stack.Screen component={LoginScreen} options={{headerShown: false}} name="Login"  />
          <Stack.Screen component={AddTripScreen} options={{headerShown: false}} name="AddTrip"  />
          <Stack.Screen component={AddExpenseScreen} options={{headerShown: false}} name="AddExpense"  />
          <Stack.Screen component={TripExpensesScreen} options={{headerShown: false}} name="TripExpense"  />
        </Stack.Navigator>
      </NavigationContainer>
      )
    
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen component={SignInScreen} options={{headerShown: false, presentation: 'modal'}} name="SignIn"  />
          <Stack.Screen component={SignUpScreen} options={{headerShown: false, presentation: 'modal'}} name="SignUp"  />
          <Stack.Screen component={WelcomeScreen} options={{headerShown: false}} name="Welcome"  />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
