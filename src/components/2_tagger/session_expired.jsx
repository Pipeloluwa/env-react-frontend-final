const SessionExpired= () => {
    return(
        <div className="fixed flex flex-col bg-[#C3B598]">
            <h1 className="text-center h-screen pt-6 text-black text-2xl font-bold">Either you are unauthorized or your session has expired, please log in again with the appropriate url</h1>
        </div> 
    );
};

export default SessionExpired;
