import { Link } from 'react-router-dom'

import { Card, Container, List } from './styles'

import ArrowSVG from '../../../../assets/icons/arrow.svg'
import EditSVG from '../../../../assets/icons/edit.svg'
import DeleteSVG from '../../../../assets/icons/trash.svg'

import { formatPhone } from '../../../../utils/formatPhone'

import { memo } from 'react'
import { ContactDTO } from '../../../../dtos/ContactDTO'

type Props = {
  orderBy: 'asc' | 'desc'
  filteredContacts: ContactDTO[]
  onToggleOrderBy: () => void
  onDeleteContact: (contact: ContactDTO) => void
}

function ContactsList({
  orderBy,
  filteredContacts,
  onToggleOrderBy,
  onDeleteContact,
}: Props) {
  return (
    <Container $orderBy={orderBy}>
      <header>
        <button type="button" onClick={onToggleOrderBy}>
          <span>Nome</span>
          <img src={ArrowSVG} alt="" />
        </button>
      </header>

      <List>
        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category.name && (
                  <small>{contact.category.name}</small>
                )}
              </div>

              <span>{contact.email}</span>
              <span>{formatPhone(contact.phone)}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img alt="Edit" src={EditSVG} />
              </Link>
              <button type="button" onClick={() => onDeleteContact(contact)}>
                <img alt="Delete" src={DeleteSVG} />
              </button>
            </div>
          </Card>
        ))}
      </List>
    </Container>
  )
}

const MemoizedContactList = memo(ContactsList)

export { MemoizedContactList as ContactsList }
