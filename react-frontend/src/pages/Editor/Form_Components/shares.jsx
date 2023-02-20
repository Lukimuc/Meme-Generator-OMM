import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

const Share = ({url}) => {
    return (
        <div>
            <EmailShareButton
                url={url}
                subject="Check out this cool Meme"
            >
            <EmailIcon size={32} round />
            </EmailShareButton>

            <FacebookShareButton
                url={url}
                subject="Check out this cool Meme"
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
                url={url}
                subject="Check out this cool Meme"
            >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton
                url={url}
                subject="Check out this cool Meme"
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
        </div>
        
    )

}

export default Share