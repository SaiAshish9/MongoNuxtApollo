<template>

<h1 v-if="confirmEmail">
You have confirmed your email
</h1>

</template>


<script>
import gql from 'graphql-tag'

export default {
    name:'confirmationEmail',
    async asyncData({params,app}){
        const {token} =params;
        const isValid=await app.apolloProvider.defaultClient.mutate({
            mutation:gql`
               mutation($token:String!){
                   confirmEmail(token:$token)
               }
            `,
            variables:{token}
        })
        return isValid.data
    }
}
</script>