import React, { useEffect, useState } from 'react'
import { always, equals, ifElse } from 'ramda'

import { Container, Typography } from '@mui/material'

import DataTable from 'components/DataTable'
import Modal from 'components/Modal'

import CandidateFile from './CandidateFile'
import { candidateTableColumns } from './constant'
import useAppStore from './store'

function App() {
  const {
    candidateList,
    hasApplication,
    applicationApiSuccess,
    applicationApiLoading,
  
    getCandidate,
    getApplication
  } = useAppStore()

  const [openVideoModal, setOpemVideoModal] = useState(false)

  const handleCloseVideoModal = () => setOpemVideoModal(false)

  useEffect(() => {
    getCandidate()
  }, [])

  const selectCandidate = async (userId) => {
    await getApplication({ userId })
  }

  useEffect(() => {
   if (applicationApiLoading === false && applicationApiSuccess === true) {
    setOpemVideoModal(true)
   }
  }, [applicationApiLoading, applicationApiSuccess])

  return (
    <Container maxWidth="md">
      <h1>Candidates</h1>
      <DataTable
        columns={candidateTableColumns}
        rows={candidateList}
        onSelectRow={selectCandidate}
      />
      <Modal
        open={openVideoModal}
        onClose={handleCloseVideoModal}
      >
        <>
          {
            ifElse(
              equals(true),
              always(<CandidateFile />),
              always(
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Sorry Candidate has no any application at this moment.
                </Typography>
             )
            )(hasApplication)
          }
        </>
      </Modal>
    </Container>
  );
}

export default App;
