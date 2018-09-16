import { gateway as MoltinGateway } from '@moltin/sdk'
import config from '../config'

const client_id = config.client_id
const Moltin = MoltinGateway({
  client_id: client_id
})

export default Moltin
