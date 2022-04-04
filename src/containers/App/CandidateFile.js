import React, { useState } from 'react'

import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  InputAdornment,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import SendIcon from '@mui/icons-material/Send'
import { green } from '@mui/material/colors'

import { CardWrapper } from './styled'

import useAppStore from './store'

const CandidateFile = () => {
  const { questionList, selectedUser, submitComment } = useAppStore()
  const [commentValue, setCommentValue] = useState('')

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 4 }}>
        {selectedUser.firstName} {selectedUser.lastName}'s File
      </Typography>
      {
        questionList.map((question) => (
          <CardWrapper key={question.id}>
            <CardMedia
              component="video"
              controls
              src={question.videoUrl}
              height="338"
              alt={question.question}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" >
                {question.question}
              </Typography>
              <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 200, overflow: 'auto' }}>
                {
                  question.comments.map(({ id, comment }) => (
                    <ListItem key={id} alignItems="center">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: green[500] }}>
                          <FaceIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment}
                      />
                    </ListItem>
                  ))
                }
              </List>
              <FormControl sx={{ m: 1, width: '75%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Add Comment</InputLabel>
                <Input
                  onChange={(evt) => setCommentValue(evt.target.value)}
                  onKeyDown={(evt) => {
                    if (evt.target.value) {
                      submitComment({ comment: commentValue, questionId: question.id })
                      setCommentValue('')
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={!commentValue}
                        aria-label="Add Comment"
                        onClick={() => {
                          submitComment({ comment: commentValue, questionId: question.id })
                          setCommentValue('')
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </CardContent>
          </CardWrapper>
        ))
      }
    </>
  )
}

export default CandidateFile
