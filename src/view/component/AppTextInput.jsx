import {TextInput} from 'react-native';
import React, {useState} from 'react';

export default function AppTextInput(props) {
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={[
        {
          backgroundColor: '#e0e2ff',
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 14,
          marginVertical: 10,
          fontSize: 18,
        },
        focus && {borderWidth: 2, borderColor: '#111bb8'},
      ]}
      placeholder={props.title}
    />
  );
}
