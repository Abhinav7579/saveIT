import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Plusicon } from '../icons/Plus'
import { Shareicon } from '../icons/Share'
import { CreateContentModal } from '../components/CreatecontentModal'
import { Sidebar } from '../components/Sidebar'
import { useState } from 'react'
import { ShareUrl } from '../hooks/Shareurl'
import { Usecontent } from '../hooks/Usecontent'
import { useNavigate } from 'react-router-dom'
export function Dashboard() {
  const [modalopen, setmodalopen] = useState(false);
  const [contents, refresh] = Usecontent();
 const navigate=useNavigate();
  return (
   
    <div>
      <Sidebar />
      <div className="p-4 ml-60 min-h-screen bg-purple-100">
        <CreateContentModal
          open={modalopen}
          onClose={() => setmodalopen(false)}
        />

        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="text-3xl font-bold">Welcome to SaveIt</div>
          <div className="flex gap-3 flex-wrap">
            <Button
             variant="secondary"
              size="md"
              startIcon={<Shareicon />}
              onClick={()=>{navigate("/friendsaveit")}}
              text={"Friends SaveIt"}
            />
            <Button
              variant="secondary"
              size="md"
              startIcon={<Shareicon />}
              onClick={ShareUrl}
              text={"Share IT"}
            />
            <Button
              variant="primary"
              size="md"
              startIcon={<Plusicon />}
              onClick={() => setmodalopen(true)}
              text={"Add Content"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contents.map(({ _id, title, type, link }) => (
            <Card
              key={_id}
              id={_id}
              type={type}
              link={link}
              title={title}
              onDelete={refresh}
            />
          ))}
        </div>
      </div>
    </div>
  );
}