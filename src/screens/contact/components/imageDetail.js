import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {width} from '../../../utils/string-format';
import HeaderChat from './HeaderChat';
const ImageDetail = props => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(props.route.params.url);
  }, []);

  return (
    <View style={styles.imageModalContainer}>
      <HeaderChat
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ImageViewer
        onClick={() => {}}
        style={styles.imageModal}
        imageUrls={[{url}]}
      />
    </View>
  );
};

export default React.memo(ImageDetail);

const styles = StyleSheet.create({
  imageModalContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  imageModal: {
    resizeMode: 'cover',
    width: width,
    height: 300,
  },
});
