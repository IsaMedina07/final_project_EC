
const { setApproved, toggleRoom, Room, Living, Bathroom, Kitchen } = useContext(ButtonContext);


    const [room, setRoom] = useState('off');
    const [living, setLiving] = useState('off');
    const [bathroom, setBathroom] = useState('off');
    const [kitchen, setKitchen] = useState('off');

    const icon = {
        icon1: <Ionicons name="flashlight" size={24} color="black" />,
        icon2: <Ionicons name="flashlight-outline" size={24} color="black" />
    }

    const [isEnabledRoom, setIsEnabledRoom] = useState(false);
    const toggleSwitchRoom = () => setIsEnabledRoom(previousState => !previousState);

    const [isEnabledLiving, setIsEnabledLiving] = useState(false);
    const toggleSwitchLiving = () => setIsEnabledLiving(previousState => !previousState);

    const [isEnabledBathroom, setIsEnabledBathroom] = useState(false);
    const toggleSwitchBathroom = () => setIsEnabledBathroom(previousState => !previousState);

    const [isEnabledKitchen, setIsEnabledKitchen] = useState(false);
    const toggleSwitchKitchen = () => setIsEnabledKitchen(previousState => !previousState);

    const pushButtom = (value) => {
        switch (value) {
            case 'room':
                room == 'off' ? setRoom('on') : setRoom('off');
                room == 'off' ? toggleRoom(value, true) : toggleRoom(value, false);
                break
            case 'living':
                living == 'off' ? setLiving('on') : setLiving('off');
                living == 'off' ? toggleRoom(value, true) : toggleRoom(value, false)
                break
            case 'bathroom':
                bathroom == 'off' ? setBathroom('on') : setBathroom('off');
                bathroom == 'off' ? toggleRoom(value, true) : toggleRoom(value, false)
                break
            case 'kitchen':
                kitchen == 'off' ? setKitchen('on') : setKitchen('off');
                kitchen == 'off' ? toggleRoom(value, true) : toggleRoom(value, false)
                break
            default:
                setRoom('off')
                setLiving('off')
                setBathroom('off')
                setKitchen('off')
                break
        }
    }

    useEffect(()=>{
        if ((Room === true && room === 'off') || (Room === false && room === 'on')) {
            pushButtom('room');
            toggleSwitchRoom();
        }
    },[Room]);

    useEffect(()=>{
        if ((Living === true && living === 'off') || (Living === false && living === 'on')) {
            pushButtom('living');
            toggleSwitchLiving();
        }
    },[Living]);

    useEffect(()=>{
        if ((Bathroom === true && bathroom === 'off') || (Bathroom === false && bathroom === 'on')) {
            pushButtom('bathroom');
            toggleSwitchBathroom();
        }
    },[Bathroom]);

    useEffect(()=>{
        if ((Kitchen === true && kitchen === 'off') || (Kitchen === false && kitchen === 'on')) {
            pushButtom('kitchen');
            toggleSwitchKitchen();
        }
    },[Kitchen]);
    
    const offAll = () =>{
        setIsEnabledRoom(false);
        setIsEnabledLiving(false);
        setIsEnabledBathroom(false);
        setIsEnabledKitchen(false);
        setRoom('off');
        setLiving('off');
        setBathroom('off');
        setKitchen('off');
        toggleRoom('room', false);
        toggleRoom('living', false);
        toggleRoom('bathroom', false);
        toggleRoom('kitchen', false);
    }