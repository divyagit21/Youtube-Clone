
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaClipboard } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const CopyIcon = styled(FaClipboard)`
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  &:hover {
  color: ${({ theme }) => theme.textSoft};
  }
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!comment || !comment.userId) {
      console.error("User ID is undefined:", comment);
      return;
    }

    const fetchComment = async () => {
      try {
        const res = await axios.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
    };

    fetchComment();
  }, [comment]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  if (!comment) {
    return <p>No comment data available</p>;
  }

  return (
    <Container>
      <Avatar src={channel.img || "default_avatar_url"} alt="Channel Avatar" />
      <Details>
        <Name>
          {channel.name} 
          <Date>1 day ago</Date>
          <CopyToClipboard text={comment.desc} onCopy={handleCopy}>
            <CopyIcon title={copied ? "Copied!" : "Copy"} />
          </CopyToClipboard>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
