import React, { useContext } from 'react';
import { UserContext } from "../utils/UserContext";
import { useParams } from "react-router-dom";
import { Card, Modal, Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { deleteTeamMember, updateUserRole, } from '../../redux/actions/teamActions';
import {deleteOrganizationUser} from '../../redux/actions/organizationActions'

const { confirm } = Modal;

function OrgEditMemberCard(props) {
	// #region CLICK UNCOLLAPSE ICON TO SHOW COMPONENT LOGIC
	const { team_id } = useParams();
    const { member, isSelf, defaultOrganization, selectedOrganization } = props;
    
    let organization_id = ''
	
	if(typeof selectedOrganization  === "undefined" ||  typeof defaultOrganization === "undefined"){
		organization_id = ''
	} else {
		organization_id = selectedOrganization.id ? selectedOrganization.id  : defaultOrganization.id
	}
	
	// const handleDelete = () => {
	// 	props.deleteTeamMember(team_id, member.user_id);
    // }
    
    const handleDelete = () => {
		props.deleteOrganizationUser(organization_id, member.user_id);
    }
    

	// Show confirmation modal when deleting member.
	const showDeleteConfirm = () => {
		confirm({
			title: <p>Are you sure you want to delete <b>{member.user_full_name}</b> from this team?</p>,
			onOk() {
				handleDelete();
			},
			okType: "danger",
			okText: "Yes",
			cancelText: 'No',
			onCancel() { },
		});
	}

	const showRoleConfirm = () => {
		confirm({
			title: <p>Are you sure you want to update role for <b>{member.user_full_name}</b>?</p>,
			onOk() {
				handleRoleChange();
			},
			okText: "Yes",
			cancelText: 'No',
			onCancel() { },
		});
	}

	const switchRole = async (roleNum) => {
		try {
			const result = await props.updateUserRole(team_id, member.user_id, roleNum);

			if (result) {
				roleChangeSuccess(`${member.user_full_name}'s role has been updated!`);
			} else {
				roleChangeError();
			}
		} catch (error) {
			roleChangeError();
		}
	}

	const handleRoleChange = () => {
		if (member.role_id === 1) {
			switchRole(2);
		} else if (member.role_id === 2) {
			switchRole(1);
		}
	}

	const roleChangeSuccess = (message) => {
		Modal.success({
			content: message,
		});
	}

	const roleChangeError = () => {
		Modal.error({
			title: 'Error!',
			content: "Uh oh, something's gone wrong. Try again later.",
		});
	}
	// #endregion CLICK UNCOLLAPSE ICON TO SHOW COMPONENT LOGIC

	return (isSelf === false &&
		<Card className="edit-card">
			<Card.Grid style={{ width: "50%", textAlign: 'center', padding: 0 }}>
				{member.role_id === 1
					? (<Tooltip placement="bottom" title={`Promote ${member.user_full_name}`}><Icon type="up-circle" theme="twoTone" twoToneColor="#52c41a" onClick={showRoleConfirm} /></Tooltip>)
					: (<Tooltip placement="bottom" title={`Demote ${member.user_full_name}`}><Icon type="down-circle" theme="twoTone" twoToneColor="#52c41a" onClick={showRoleConfirm} /></Tooltip>)}
			</Card.Grid>
			<Card.Grid alt="Remove member from Organization" style={{ width: "50%", textAlign: 'center', padding: 0 }}>
				<Tooltip placement="bottom" title={`Remove ${member.user_full_name}`}><Icon type="stop" theme="twoTone" twoToneColor="#ff0000" onClick={showDeleteConfirm} /></Tooltip>
			</Card.Grid>
		</Card>
	)
}

const mapStateToProps = (state) => ({
    deleteCount: state.Team.deletedUserCount,
    id: state.User.userId,
	//organization_id: state.User.organization_id,
	defaultOrganization: state.User.defaultOrganization,
	selectedOrganization: state.User.selectedOrganization,
	organizations: state.User.organizations,
	team: state.Team.team
    
});

const mapActionsToProps = {
	deleteTeamMember,
    updateUserRole,
    deleteOrganizationUser
}

export default connect(mapStateToProps, mapActionsToProps)(OrgEditMemberCard);