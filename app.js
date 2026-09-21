// ==========================================
// ১. কনফিগারেশন (আপনার নিজের ডেটা বসান)
// ==========================================

// আপনার ডিপ্লয় করা স্মার্ট কন্ট্রাক্টের অ্যাড্রেস এখানে বসান
const CONTRACT_ADDRESS = "0xYourContractAddressHere"; 

// আপনার স্মার্ট কন্ট্রাক্টের ABI এখানে বসান (Remix IDE থেকে কপি করুন)
const CONTRACT_ABI = [
    // উদাহরণস্বরূপ কিছু ফাংশন:
    "function deposit() public payable",
    "function withdraw(uint256 amount) public",
    "function balances(address) public view returns (uint256)",
    "event Deposit(address indexed user, uint256 amount)"
];

// ==========================================
// ২. গ্লোবাল ভেরিয়েবল
// ==========================================
let provider;
let signer;
let contract;
let userAddress = null;

// ==========================================
// ৩. MetaMask কানেক্ট করার ফাংশন
// ==========================================
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert("MetaMask ইনস্টল করুন!");
        return;
    }

    try {
        // ওয়ালেট কানেক্ট করার অনুমতি চাওয়া
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];

        // Ethers.js প্রোভাইডার এবং সাইনার সেট করা
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();

        // স্মার্ট কন্ট্রাক্ট ইনস্ট্যান্স তৈরি
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // UI আপডেট করা (যদি পেজে এই এলিমেন্টগুলো থাকে)
        updateUI();

        console.log("Connected to:", userAddress);
        return userAddress;

    } catch (error) {
        console.error("User denied wallet connection", error);
    }
}

// ==========================================
// ৪. UI আপডেট করার ফাংশন
// ==========================================
function updateUI() {
    // Connect Wallet বাটন থাকলে
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.innerText = "Connected";
        connectBtn.disabled = true;
    }

    // ওয়ালেট অ্যাড্রেস দেখানোর এলিমেন্ট থাকলে
    const walletDisplay = document.getElementById('walletAddress');
    if (walletDisplay) {
        walletDisplay.innerText = `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;
    }

    // অ্যাডমিন পেজের জন্য (যদি অ্যাডমিন অ্যাড্রেস মিলে)
    const adminPanel = document.getElementById('adminPanel');
    const ADMIN_ADDRESS = "0xYourAdminAddressHere"; // আপনার নিজের অ্যাডমিন অ্যাড্রেস
    if (adminPanel && userAddress.toLowerCase() === ADMIN_ADDRESS.toLowerCase()) {
        adminPanel.style.display = 'block';
    }
}

// ==========================================
// ৫. ডিপোজিট ফাংশন (deposit.html এর জন্য)
// ==========================================
async function depositETH() {
    if (!contract) {
        alert("প্রথমে ওয়ালেট কানেক্ট করুন!");
        return;
    }

    try {
        const amount = document.getElementById('depositAmount').value;
        const tx = await contract.deposit({ 
            value: ethers.utils.parseEther(amount) 
        });
        await tx.wait();
        alert("ডিপোজিট সফল হয়েছে!");
    } catch (error) {
        console.error("Deposit failed:", error);
        alert("ডিপোজিট ব্যর্থ হয়েছে!");
    }
}

// ==========================================
// ৬. উইথড্র ফাংশন (withdraw.html এর জন্য)
// ==========================================
async function withdrawETH() {
    if (!contract) {
        alert("প্রথমে ওয়ালেট কানেক্ট করুন!");
        return;
    }

    try {
        const amount = document.getElementById('withdrawAmount').value;
        const tx = await contract.withdraw(ethers.utils.parseEther(amount));
        await tx.wait();
        alert("উইথড্র সফল হয়েছে!");
    } catch (error) {
        console.error("Withdraw failed:", error);
        alert("উইথড্র ব্যর্থ হয়েছে!");
    }
}

// ==========================================
// ৭. ব্যালেন্স দেখার ফাংশন (assets.html এর জন্য)
// ==========================================
async function loadBalance() {
    if (!contract || !userAddress) {
        return;
    }

    try {
        const balance = await contract.balances(userAddress);
        const balanceInEth = ethers.utils.formatEther(balance);
        
        const balanceDisplay = document.getElementById('userBalance');
        if (balanceDisplay) {
            balanceDisplay.innerText = `${balanceInEth} ETH`;
        }
    } catch (error) {
        console.error("Error loading balance:", error);
    }
}

// ==========================================
// ৮. ইভেন্ট লিসেনার (নোটিফিকেশনের জন্য)
// ==========================================
function listenToEvents() {
    if (!contract) return;

    contract.on("Deposit", (user, amount) => {
        console.log(`New Deposit: ${user} deposited ${ethers.utils.formatEther(amount)} ETH`);
        
        // নোটিফিকেশন পেজে দেখানোর জন্য
        const notifBox = document.getElementById('notificationBox');
        if (notifBox) {
            const newNotif = document.createElement('div');
            newNotif.innerText = `ডিপোজিট: ${user.substring(0,6)}... ${ethers.utils.formatEther(amount)} ETH`;
            notifBox.prepend(newNotif);
        }
    });
}

// ==========================================
// ৯. পেজ লোড হলে যা যা হবে
// ==========================================
window.addEventListener('load', async () => {
    // যদি আগে থেকেই ওয়ালেট কানেক্টেড থাকে
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
    }

    // বাটনগুলোর সাথে ইভেন্ট লিসেনার যুক্ত করা
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }

    const depositBtn = document.getElementById('depositBtn');
    if (depositBtn) {
        depositBtn.addEventListener('click', depositETH);
    }

    const withdrawBtn = document.getElementById('withdrawBtn');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', withdrawETH);
    }

    // ইভেন্ট লিসেনার চালু করা
    if (contract) {
        listenToEvents();
    }

    // ব্যালেন্স লোড করা (যদি assets পেজে থাকে)
    if (document.getElementById('userBalance')) {
        loadBalance();
    }
});

// ==========================================
// ১০. অ্যাকাউন্ট পরিবর্তন হলে আপডেট
// ==========================================
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAddress = accounts[0];
            connectWallet();
        } else {
            userAddress = null;
            location.reload();
        }
    });
}
