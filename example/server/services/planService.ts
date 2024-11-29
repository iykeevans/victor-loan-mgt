import UserPlan from '../models/userPlan';
import Plan from '../models/planModel';
import User from '../models/userModel';


export const createPlan = async (planData: {

    name: string;
    description: string;
    maxLimit: number;
    frequency: string; //'daily' | 'weekly' | 'monthly' | 'annually'
    
    cost: number;
    status:  string;// 'active' | 'inactive';
    maxWorkspaces?:  number;
    maxUsers?:  number
}) => {
    try {




        let maxUsers = 0;
        let maxWorkspaces = 0;

        switch (planData.frequency) {
            case 'daily': {

                maxUsers = 5;
                maxWorkspaces = 2
                break;
            }

            case 'weekly': {

                maxUsers = 10;
                maxWorkspaces = 4
                break;
            }


            case 'monthly': {

                maxUsers = 10000; // employees
                maxWorkspaces = 10
                break;
            }

            case 'annually': {

                maxUsers = 100000;
                maxWorkspaces = 20
                break;
            }

        }
        planData.maxUsers = maxUsers;
        planData.maxWorkspaces = maxWorkspaces
        const newPlan = new Plan(planData);
        await newPlan.save();
        return newPlan;
    } catch (error: any) {
        throw new Error('Error creating user plan: ' + error.message);
    }
};

export const getPlan = async (planId: string) => {
    try {
        const plan = await Plan.findById(planId).exec();
        if (!plan) {
            throw new Error('Plan not found');
        }
        return plan;
    } catch (error: any) {
        throw new Error('Error fetching plan: ' + error.message);
    }
};

export const getPlanByName = async (planName: string) => {
    try {
        const plan = await Plan.findOne({name: planName}).exec();
        if (!plan) {
            throw new Error('Plan not found');
        }
        return plan;
    } catch (error: any) {
        throw new Error('Error fetching plan: ' + error.message);
    }
};

export const updatePlan = async (planId: string, updatedData: Partial<{

    name: string;
    description: string;
    maxLimit: number;
    frequency: 'daily' | 'weekly' | 'monthly' | 'annually';
    cost: number;
    status: 'active' | 'inactive';
    maxWorkspaces?: null | number;
    maxUsers?: null | number
}>) => {
    try {
        const plan = await Plan.findById(planId).exec();
        if (!plan) {
            throw new Error('Plan not found');
        }



        let maxUsers = 0;
        let maxWorkspaces = 0;

        switch (updatedData.frequency) {
            case 'daily': {

                maxUsers = 5;
                maxWorkspaces = 2
                break;
            }

            case 'weekly': {

                maxUsers = 10;
                maxWorkspaces = 4
                break;
            }


            case 'monthly': {

                maxUsers = 10000; // employees
                maxWorkspaces = 10
                break;
            }

            case 'annually': {

                maxUsers = 100000;
                maxWorkspaces = 20
                break;
            }

        }
        updatedData.maxUsers = maxUsers;
        updatedData.maxWorkspaces = maxWorkspaces

        Object.assign(plan, updatedData);
        await plan.save();
        return plan;
    } catch (error: any) {
        throw new Error('Error updating plan: ' + error.message);
    }
};

export const deletePlan = async (planId: string) => {
    try {
        const plan = await Plan.findByIdAndDelete(planId).exec();
        if (!plan) {
            throw new Error('Plan not found');
        }
        return { message: 'Plan deleted successfully' };
    } catch (error: any) {
        throw new Error('Error deleting plan: ' + error.message);
    }
};


// Create a user plan
export const createUserPlanService = async (
    userId: any, planId: any, rateLimit: number, frequency: string) => {
    const plan: any = await Plan.findById(planId);
    if (!plan) {
        throw new Error('Plan not found');
    }
    let startDate = new Date
    let endDate = new Date
    switch (frequency) {
        case 'daily': {
            startDate = new Date()
            endDate = new Date(new Date().setDate(new Date().getDate() + 1))
            break;
        }
        case 'weekly': {
            startDate = new Date()
            endDate = new Date(new Date().setDate(new Date().getDate() + 7))
            break;
        }
        case 'monthly': {
            startDate = new Date()
            endDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
            break;
        }
        case 'annually': {
            startDate = new Date()
            endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            break;
        }
    }
    const userPlan = new UserPlan({
        userId,
        planId,
        rateLimit,
        frequency,
        startDate: startDate,
        endDate: endDate,
    });
    // update user subscription to plan
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new Error('User not found');
    }
    // Add the plan to the user's subscriptions
    user.subscriptions.push(plan._id);
    user.subscriptionExpiresAt = endDate; // Set to expiry (e.g., 1 month)
    await user.save();
    return await userPlan.save();
};

// Get a user's plan
export const getUserPlanService = async (userId: string) => {
    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan) {
        throw new Error('User plan not found');
    }
    return userPlan;
};

// Update a user's plan
export const updateUserPlanService = async (userId: string, updateData: any) => {
    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan) {
        throw new Error('User plan not found');
    }
    const planId = updateData.planId
    const plan = await Plan.findById(planId);
    if (!plan) {
        throw new Error('Plan not found');
    }
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new Error('User not found');
    }
    userPlan.planId = updateData.planId || userPlan.planId;
    userPlan.rateLimit = updateData.rateLimit || userPlan.rateLimit;
    userPlan.frequency = updateData.frequency || userPlan.frequency;
    userPlan.status = updateData.status || userPlan.status;
    const chosenFrequency = updateData.frequency
    let endDate = new Date;
    switch (chosenFrequency) {
        case 'daily': {
            endDate = new Date(new Date().setDate(new Date().getDate() + 1))
            break;
        }
        case 'weekly': {
            endDate = new Date(new Date().setDate(new Date().getDate() + 7))
            break;
        }
        case 'monthly': {
            endDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
            break;
        }
        case 'annually': {
            endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            break;
        }
    }
    userPlan.startDate = new Date()
    userPlan.endDate = endDate; // Update the end date to 1 year from now
    //const oldPlanId = user.planId
    // remove old plan in user's subscriptions
    user.subscriptions = []  // for one user should only subscribe to 1 plan
    user.subscriptions.push(planId);
    user.subscriptionExpiresAt = endDate; // Set to expiry (e.g., 1 month)
    userPlan.planId = planId
    await user.save();

    await userPlan.save();
    return userPlan;
};

// Delete a user's plan
export const deleteUserPlanService = async (userId: string) => {
    const userPlan = await UserPlan.findOneAndDelete({ userId });
    if (!userPlan) {
        throw new Error('User plan not found');
    }

    
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new Error('User not found');
    }



    // Add the plan to the user's subscriptions
    user.subscriptions = [];
    user.subscriptionExpiresAt = null; // Set to expiry (e.g., 1 month)
    await user.save();
    return { message: 'User plan deleted successfully' };
};
