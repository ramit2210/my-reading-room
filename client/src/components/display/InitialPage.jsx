function InitialPage() {
    return (
        <div className="flex flex-col justify-center items-center w-[60%] h-[40vh] bg-gray-200 rounded-2xl shadow-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Welcome to My Reading Room
            </h1>
            <p className="text-lg text-gray-700 text-center w-2/3">
                Your library is currently empty. Click the plus button to add
                your first book and start building your reading journey!
            </p>
        </div>
    );
}

export default InitialPage;
