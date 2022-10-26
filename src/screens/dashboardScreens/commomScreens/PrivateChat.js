import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { RNVoiceRecorder } from 'react-native-voice-recorder'

import {Layout} from '../../../components';
import {Colors} from '../../../constants';
import {wp} from '../../../utils/screenResponsiveFunctions';
import showToastMessage from '../../../utils/showToastMessage';
import {requestPermissions} from '../../../utils/requestPermissions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addMessage} from '../../../redux/actions/socketActions';

const ChatHeader = ({title, image, phoneNumber}) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onCallPress = () => {
    if (phoneNumber?.trim()) Linking.openURL(`tel:${phoneNumber}`);
    else showToastMessage(`${title} has not updated the phone number yet.`);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <AntDesign name={'arrowleft'} size={25} color={'#FFF'} />
      </TouchableOpacity>
      <Image
        source={{uri: image}}
        style={{width: 36, height: 36, borderRadius: 18, marginLeft: 10}}
      />
      <Text
        style={{
          color: '#FFF',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>
        {title}
      </Text>
      <TouchableOpacity
        style={{marginLeft: 'auto', marginRight: 5, marginTop: 5}}
        onPress={onCallPress}>
        {/* transform: [{ rotate: "180deg" }] */}
        <Ionicons name={'ios-call-sharp'} size={20} color={'#FFF'} />
      </TouchableOpacity>
    </View>
  );
};

const PrivateChat = props => {
  const user = props.route.params?.item;
  const me = useSelector(state => state.auth.user);

  const {socket, messages} = useSelector(state => state.socket);

  const dispatch = useDispatch();

  const [isTyping, setIsTyping] = useState(true);

  // const messages = allMessages.filter(item => (item.user._id === user._id || item.reciever === user._id))

  const initializeMessages = async () => {
    socket.emit('INITIALIZE_CHAT', {myId: me._id, userId: user._id});
  };

  useEffect(() => {
    const subscribe = props.navigation.addListener('focus', () => {
      initializeMessages();
    });
    return subscribe;
  }, [props.navigation]);

  const onMicPress = async () => {
    const permisson = await requestPermissions();

    if (permisson !== true) return;

    // RNVoiceRecorder.Record({
    //   onDone: (path) => {

    //   },
    //   onCancel: () => {

    //   }
    // })
  };

  // const setMessageList = useCallback((messages = []) => {

  //   setMessages(previousMessages => GiftedChat.append([], messages))
  //   setMessages(messages)
  // }, [])

  const onSend = messages => {
    const newMessageList = messages.map(item => {
      const newMessage = {
        ...item,
        reciever: user._id,
      };
      socket.emit('SEND_MESSAGE', newMessage);
      return newMessage;
    });
    dispatch(addMessage(newMessageList));
  };

  // useEffect(() => {
  //   setMessages(messages)
  // }, [messages])

  const onLaunchCameraImage = async () => {
    const permisson = await requestPermissions();

    if (permisson !== true) return;

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      selectionLimit: 0,
    };

    const callback = value => {
      if (value?.assets) {
      } else {
        console.error('Somethings is wrong', value);
      }
    };

    try {
      launchCamera(options, callback);
    } catch (error) {
      console.error(error);
      showToastMessage(error.message);
    }
  };

  const onLaunchGallery = async () => {
    const permisson = await requestPermissions();

    if (permisson !== true) return;

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      selectionLimit: 0,
    };

    const callback = value => {
      if (value?.assets) {
        const messages = value?.assets?.map(item => ({
          _id: Math.random(),
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          image: item.uri,
        }));
        onSend(messages);
      } else {
        console.error('Somethings is wrong', value);
      }
    };

    try {
      launchImageLibrary(options, callback);
    } catch (error) {
      console.error(error);
      showToastMessage(error.message);
    }
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome
        name={'angle-double-down'}
        size={25}
        color={Colors.primaryColor}
      />
    );
  };

  const renderMessageAudio = props => {
    const {currentMessage} = props;

    const onPlay = () => {
      const temp = new Promise((resolve, reject) => {
        // RNVoiceRecorder.Play({
        //   path: currentMessage.audio,
        //   onDone: (path) => {
        //   },
        //   onCancel: () => {
        //   }
        // })
      });
    };
    return (
      <TouchableOpacity onPress={onPlay} style={styles.audioPlayBtn}>
        <AntDesign name={'play'} size={25} />
      </TouchableOpacity>
    );
  };

  const renderMessageVideo = props => {
    const {currentMessage} = props;

    return (
      <View
        style={{
          width: wp(80),
          height: (wp(80) * 2.8) / 5,
          margin: 5,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}>
        <VideoPlayer
          video={currentMessage.video}
          style={{
            width: '100%',
            height: '100%',
          }}
          thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
        />
      </View>
    );
  };

  const AudioIcon = () => (
    <TouchableOpacity
      onPress={onMicPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        width: 45,
        height: 45,
        borderRadius: 50,
        marginLeft: 10,
      }}>
      <FontAwesome name={'microphone'} size={20} color={'#FFF'} />
    </TouchableOpacity>
  );

  const AttachmentIcon = props => {
    if (props.text.trim()) {
      return <></>;
    }

    return (
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          marginRight: 15,
          marginVertical: 12,
        }}>
        <Entypo name={'attachment'} size={20} color={Colors.primaryColor} />
      </TouchableOpacity>
    );
  };

  const CameraIconImage = props => {
    if (props.text.trim()) {
      return <></>;
    }

    return (
      <TouchableOpacity
        onPress={onLaunchGallery}
        onLongPress={onLaunchCameraImage}
        style={{
          alignSelf: 'flex-end',
          marginRight: 15,
          marginVertical: 12,
        }}>
        <Entypo name={'camera'} size={20} color={Colors.primaryColor} />
      </TouchableOpacity>
    );
  };

  renderComposer = props => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Composer {...props} />
        <AttachmentIcon {...props} />
        <CameraIconImage {...props} />
      </View>
    );
  };

  const SendIcon = props => (
    <Send
      {...props}
      containerStyle={{
        padding: 0,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primaryColor,
          width: 45,
          height: 45,
          borderRadius: 50,
          paddingLeft: 5,
          marginLeft: 10,
        }}>
        <Ionicons name={'md-send-sharp'} size={22} color={'#FFF'} />
      </View>
    </Send>
  );

  renderSend = props => {
    if (!props.text.trim()) {
      return <AudioIcon />;
    }

    return <SendIcon {...props} />;
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#FFF',
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
          marginHorizontal: 10,
          borderRadius: 20,
          marginBottom: 5,
          width: wp(100) - 75,
          // height: 45,
        }}
      />
    );
  };

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#FFF',
        },
        right: {
          backgroundColor: Colors.primaryColor,
        },
      }}
      textStyle={{}}
    />
  );

  return (
    <Layout style={styles.container}>
      <ChatHeader
        title={user?.displayName}
        image={user?.profilePicture}
        phoneNumber={user?.phoneNumber}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: me._id,
        }}
        isTyping={isTyping}
        placeholder={'Message'}
        loadEarlier={true}
        renderInputToolbar={customtInputToolbar}
        renderBubble={renderBubble}
        minInputToolbarHeight={70}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderMessageVideo={renderMessageVideo}
        renderMessageAudio={renderMessageAudio}
        showUserAvatar={false}
        renderAvatar={() => null}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </Layout>
  );
};

export default PrivateChat;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  headerContainer: {
    height: 50,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  audioPlayBtn: {
    marginLeft: 10,
    marginTop: 10,
  },
});

const PROFILE_PIC =
  'https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/181347224_1985704098244405_6348078292449228458_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=syUGYEsd-VYAX_89PR4&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT9UVtCxhVBuWpCktJNV--Wk5bq4gk2adT2BsI3igvPLrA&oe=6270AA37';
