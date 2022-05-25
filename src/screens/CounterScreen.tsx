import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice'

export function ShowState(){
    const count = useSelector((state: RootState) => state.counter.value);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Count: {count}</Text>
        </View>
    )
}

export default function CounterScreen({ navigation }: any) {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{count}</Text>
        <Button title='Increment' onPress={() => dispatch(increment())} />
        <Button title='Decrement' onPress={() => dispatch(decrement())} />
        <Button title='Show State' onPress={() => navigation.push('ShowCount')} />
      </View>
    );
  }
  